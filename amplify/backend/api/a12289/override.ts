// import * as cdk from 'aws-cdk-lib'
import { AmplifyApiGraphQlResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper'

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
  // new cdk.CfnOutput(resources.api.rootstack, 'GraphQLAPIDomain', {
  //   value: resources.api.GraphQLAPI.attrGraphQlUrl.replace('https://', ''),
  // })
  // new cdk.CfnOutput(resources.api.rootstack, 'MyCustomOutput', {
  //   value: 'my-output',
  // })
}
