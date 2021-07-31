# Transformer Visualizations
Investigations on Transformer Visualizations by the Aether Prototyping and Incubation team.

## Getting Started

### Development Environment Setup
- `python -m pip install --upgrade pip`
- `pip install -r requirements.txt --cache-dir <path-to-pip-cache-dir>` (The `cache-dir` parameter is optional).
- `pip install -e .`
- `npm install`
- `npm run build`

### Running
 `PERSPECTIVE_API_KEY=<perspective-api-key> GPT2_MODEL_VERSION=<gpt2-model-version> NUM_RETURN_SEQUENCES=<number-of-return-sequences> TRANSFORMERS_CACHE=<path-to-transformers-cache> FLASK_APP=transformerviz/server.py flask run --host 0.0.0.0 --port 5000` (The `TRANSFORMERS_CACHE` environment variable is optional).
- Point your browser to port 5000 of the server on which the app is running.

## Contributing
This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks
This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
