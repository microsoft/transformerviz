# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

import pkg_resources
from jinja2 import Template
from flask import (
    Flask,
    request)
from flask_cors import CORS
from transformerviz.helpers import utils
import os


app = Flask(__name__)
CORS(app)

utils.set_seed(0)

text_generators = {
    "gpt2": utils.TextGenerator(
        os.environ.get("GPT2_MODEL_VERSION", "gpt2"),
        num_return_sequences=int(os.environ.get("NUM_RETURN_SEQUENCES", 10)))
}

perspective_api_client = utils.PerspectiveAPIClient(
    api_key=os.environ.get("PERSPECTIVE_API_KEY"),
    requested_attributes={
        "TOXICITY": {},
        "SEVERE_TOXICITY": {},
        "IDENTITY_ATTACK": {},
        "INSULT": {},
        "PROFANITY": {},
        "THREAT": {},
        "SEXUALLY_EXPLICIT": {},
        "FLIRTATION": {}
    })


def read_app_js():
    resource_package = __name__
    javascript_path = '/'.join(('assets', 'app-build.js'))
    app_javascript = pkg_resources.resource_string(
        resource_package, javascript_path).decode("utf-8")

    return app_javascript


def read_app_css():
    resource_package = __name__
    javascript_path = '/'.join(('assets', 'app.css'))
    app_css = pkg_resources.resource_string(
        resource_package, javascript_path).decode("utf-8")

    return app_css


def read_app_html_template_string():
    resource_package = __name__
    html_template_path = '/'.join(('assets', 'index.html'))
    app_html_template_string = pkg_resources.resource_string(
        resource_package, html_template_path).decode("utf-8")

    return app_html_template_string


@app.route("/")
def serve_app():
    app_javascript = read_app_js()
    app_css = read_app_css()
    app_html_template_string = read_app_html_template_string()
    app_html_template = Template(app_html_template_string)

    return app_html_template.render(app_css=app_css, app_javascript=app_javascript)


@app.route("/api/v1/generate_text", methods=["POST"])
def generate_text():
    request_json = request.json
    model_name = request_json.get("model", "gpt2")
    prompt = request_json.get("prompt")
    do_sample = request_json.get("do_sample")
    early_stopping = request_json.get("early_stopping")
    min_length = request_json.get("min_length")
    max_length = request_json.get("max_length")
    top_k = request_json.get("top_k")
    top_p = request_json.get("top_p")
    temperature = request_json.get("temperature")
    num_beams = request_json.get("num_beams")
    text_generator = text_generators.get(model_name)
    utils.set_seed(0)
    generated_sentences = text_generator.generate_text(
        prompt,
        do_sample=do_sample,
        early_stopping=early_stopping,
        min_length=min_length,
        max_length=max_length,
        top_k=top_k,
        top_p=top_p,
        temperature=temperature,
        num_beams=num_beams)
    analyzed_sentences = perspective_api_client.analyze_sentences(generated_sentences)
    analyzed_sentences_with_ids = list(map(
        lambda analyzed_sentence_id_tuple: {"id": analyzed_sentence_id_tuple[0] + 1, "text": analyzed_sentence_id_tuple[1]["text"], "perspective": analyzed_sentence_id_tuple[1]["perspective"]},
        enumerate(analyzed_sentences)))
    return {"text_generation_results": analyzed_sentences_with_ids}


@app.route("/api/v1/analyze_text", methods=["POST"])
def analyze_text():
    request_json = request.json
    text = request_json.get("text", "")
    analyzed_sentence = perspective_api_client.analyze_sentences([text]).pop()

    return {"text_analysis_result": analyzed_sentence}
