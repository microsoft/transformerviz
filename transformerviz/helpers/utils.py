# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM)
from torch.nn import functional as F
from googleapiclient import discovery
import torch


def set_seed(seed):
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)


def generate_sentences_hf(tokenizer, model, context,
                          do_sample=False, early_stopping=False,
                          min_length=10, max_length=20,
                          top_k=50, top_p=1.0, temperature=1.0, num_beams=1,
                          num_return_sequences=10):
    context = context.strip()
    input_ids = tokenizer.encode(context, return_tensors='pt')

    # If num_beams is greater than 1, then the number of return sequences
    # needs to be lesser than or equal to the number of beams.
    if num_beams > 1 and do_sample:
        num_return_sequences = num_beams
    elif not do_sample:
        num_return_sequences = 1

    beam_outputs = model.generate(
        input_ids,
        do_sample=do_sample,
        early_stopping=early_stopping,
        min_length=min_length,
        max_length=max_length,
        top_k=top_k,
        top_p=top_p,
        temperature=temperature,
        num_beams=num_beams,
        num_return_sequences=num_return_sequences,
        output_scores=True,
        return_dict_in_generate=True
    )

    return_sequences = []
    for beam_output in beam_outputs.sequences:
        decoded_sequence = tokenizer.decode(beam_output, skip_special_tokens=True)
        return_sequences.append(decoded_sequence)

    return return_sequences


class TextGenerator(object):

    def __init__(self, model_name, num_return_sequences=10):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            pad_token_id=self.tokenizer.eos_token_id)
        self.num_return_sequences = num_return_sequences

    def generate_text(self, prompt,
                      do_sample=False, early_stopping=False,
                      min_length=10, max_length=20,
                      top_k=50, top_p=1.0, temperature=1.0, num_beams=1):
        results = generate_sentences_hf(
            self.tokenizer, self.model, prompt,
            do_sample=do_sample, early_stopping=early_stopping,
            min_length=min_length, max_length=max_length,
            top_k=top_k, top_p=top_p,
            temperature=temperature, num_beams=num_beams,
            num_return_sequences=self.num_return_sequences)

        return results


class PerspectiveAPIClient(object):

    def __init__(self, api_key=None, requested_attributes=None):
        self.client = discovery.build(
            "commentanalyzer",
            "v1alpha1",
            developerKey=api_key,
            discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
            static_discovery=False,
        )

        if requested_attributes is None:
            requested_attributes = {'TOXICITY': {}}

        self.requested_attributes = requested_attributes

    def analyze_sentences(self, sentences):
        results = []
        for sentence in sentences:
            analyze_request = {
                "comment": {"text": sentence},
                "requestedAttributes": self.requested_attributes
            }
            try:
                response = self.client.comments().analyze(body=analyze_request).execute()
                results.append({
                    "text": sentence,
                    "perspective": response
                })
            except Exception:
                default_perspective_response = {
                    "attributeScores": {
                        "THREAT": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "IDENTITY_ATTACK": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "SEXUALLY_EXPLICIT": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "SEVERE_TOXICITY": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "TOXICITY": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "INSULT": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "FLIRTATION": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        },
                        "PROFANITY": {
                            "spanScores": [],
                            "summaryScore": {
                                "value": 0.0,
                                "type": "PROBABILITY"
                            }
                        }
                    }
                }
                results.append({
                    "text": sentence,
                    "perspective": default_perspective_response
                })

        return results
