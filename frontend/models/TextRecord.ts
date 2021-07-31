// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import AnalyzedText from "./AnalyzedText";

class TextRecord {
  original: AnalyzedText;
  edited: AnalyzedText;
  editLoading: boolean;
  editError: any;
  id: number;

  constructor(text_generation_result: any) {
    this.id = text_generation_result.id;
    this.original = new AnalyzedText(text_generation_result);
    this.edited = null;
    this.editLoading = false;
    this.editError = null;
  }
}

export default TextRecord;