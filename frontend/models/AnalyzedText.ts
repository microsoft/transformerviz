class AnalyzedText {
  text: string;
  id: number;
  toxicity: number;
  severeToxicity: number;
  identityAttack: number;
  insult: number;
  profanity: number;
  threat: number;
  sexuallyExplicit: number;
  flirtation: number;

  constructor(text_generation_result: any) {
    this.text = text_generation_result.text;
    this.id = text_generation_result.id;
    this.toxicity = text_generation_result.perspective.attributeScores.TOXICITY.summaryScore.value;
    this.severeToxicity = text_generation_result.perspective.attributeScores.SEVERE_TOXICITY.summaryScore.value;
    this.identityAttack = text_generation_result.perspective.attributeScores.IDENTITY_ATTACK.summaryScore.value;
    this.insult = text_generation_result.perspective.attributeScores.INSULT.summaryScore.value;
    this.profanity = text_generation_result.perspective.attributeScores.PROFANITY.summaryScore.value;
    this.threat = text_generation_result.perspective.attributeScores.THREAT.summaryScore.value;
    this.sexuallyExplicit = text_generation_result.perspective.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value;
    this.flirtation = text_generation_result.perspective.attributeScores.FLIRTATION.summaryScore.value;
  }
}

export default AnalyzedText;