export type AmplifyDependentResourcesAttributes = {
  "api": {
    "cryptoapi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "notesapi": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "cryptofunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}