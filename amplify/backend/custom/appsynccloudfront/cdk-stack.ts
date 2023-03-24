import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper'
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref'
import { Construct } from 'constructs'
//import * as iam from 'aws-cdk-lib/aws-iam';
//import * as sns from 'aws-cdk-lib/aws-sns';
//import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
//import * as sqs from 'aws-cdk-lib/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props)
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    })

    const appsync: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [{ category: 'api', resourceName: 'a12289' }]
      )

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront-readme.html#customizing-response-headers-with-response-headers-policies
    const myResponseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
      this,
      'ResponseHeadersPolicy',
      {
        responseHeadersPolicyName: 'MyPolicy',
        comment: 'A default policy',
        corsBehavior: {
          accessControlAllowCredentials: false,
          accessControlAllowHeaders: ['*'],
          accessControlAllowMethods: ['POST'],
          accessControlAllowOrigins: [
            'http://localhost:3000',
            'https://main.d2ojvabfaxfdpz.amplifyapp.com',
          ],
          accessControlExposeHeaders: [],
          accessControlMaxAge: cdk.Duration.seconds(600),
          originOverride: true,
        },
        securityHeadersBehavior: {
          contentSecurityPolicy: {
            contentSecurityPolicy: 'default-src https:;',
            override: true,
          },
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy: cloudfront.HeadersReferrerPolicy.NO_REFERRER,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.seconds(600),
            includeSubdomains: true,
            override: true,
          },
          // xssProtection: { protection: true, modeBlock: true, reportUri: 'https://example.com/csp-report', override: true },
        },
        removeHeaders: ['Server'],
        serverTimingSamplingRate: 50,
      }
    )

    const headerAllowlist = []

    const graphQLDomain = cdk.Fn.join(
      '',
      cdk.Fn.split(
        'https://',
        cdk.Fn.ref(appsync.api.a12289.GraphQLAPIEndpointOutput)
      )
    )

    const distribution = new cloudfront.Distribution(this, 'CFDistribution', {
      // domainNames and certificate needed for amplify.aws subdomain (connected to a Route53 hosted zone)
      defaultBehavior: {
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new cloudfront.CachePolicy(this, 'CachePolicy', {
          // headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
          //   ...headerAllowlist
          // ),
          queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
          cookieBehavior: cloudfront.CacheCookieBehavior.all(),
        }),
        origin: new origins.HttpOrigin(graphQLDomain, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
        }),
        responseHeadersPolicy: myResponseHeadersPolicy,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      },
      // add Web Application Firewall (WAF)
      // webAclId: new WAF(this, 'WAFCloudFront', {
      //   name: 'WAFCloudFront',
      // }).attrArn,
    })

    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: distribution.distributionId,
    })
    new cdk.CfnOutput(this, 'CloudFrontDistributionDomainName', {
      value: distribution.distributionDomainName,
    })
    new cdk.CfnOutput(this, 'CloudFrontDistributionURL', {
      value: `https://${distribution.distributionDomainName}`,
    })
  }
}
