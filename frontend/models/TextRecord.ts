import AnalyzedText from "./AnalyzedText";

class TextRecord {
  original: AnalyzedText;
  edited: AnalyzedText;
  id: number;

  constructor(text_generation_result: any) {
    this.id = text_generation_result.id;
    this.original = new AnalyzedText(text_generation_result);
    this.edited = null;
  }
}

export default TextRecord;