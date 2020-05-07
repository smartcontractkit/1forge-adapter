# Chainlink 1Forge External Adapter

**This adapter has moved to our [external adapters monorepo](https://github.com/smartcontractkit/external-adapters-js)!**

## Input Params

- `base` or `to`: The target currency to query (required)
- `quote` or `from`: The currency to convert to (required)
- `endpoint`: The endpoint to call (optional)

## Output

```json
{
 "jobRunID": "1",
 "data": {
  "value": 1.22687,
  "text": "1.0 GBP is worth 1.22687 USD",
  "timestamp": 1587489920,
  "result": 1.22687
 },
 "result": 1.22687,
 "statusCode": 200
}
```

## Install

```bash
yarn
```

## Test

```bash
yarn test
```

## Create the zip

```bash
zip -r cl-1forge.zip .
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t 1forge-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -e API_KEY='YOUR_API_KEY' -it 1forge-adapter:latest
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-1forge.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-1forge.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
