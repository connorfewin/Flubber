import requests
import json

def access_appsync_get_securities():
    try:
        # Set the AWS AppSync API endpoint and API key
        endpoint_url = 'https://67fjb5ocrjeolarohe4j5gfwaq.appsync-api.us-east-1.amazonaws.com/graphql'
        api_key = 'da2-43ktphhlkvco7p4c3aorqoxhfa'

        # Define the GraphQL query
        query = '''
            query ListSecurities(
              $filter: ModelSecurityFilterInput
              $limit: Int
              $nextToken: String
            ) {
              listSecurities(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
                  id
                  symbol
                  portfolioId
                  portfolioAllocation
                  profitAllocation
                  currentPrice
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
        '''

        # Set the request headers
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        }

        # Set the request payload
        payload = {
            'query': query,
            'variables': {
                'filter': None,
                'nextToken': None
            }
        }

        # Make the HTTP POST request
        response = requests.post(endpoint_url, headers=headers, data=json.dumps(payload))

        # Handle the response
        if response.status_code == 200:
            data = response.json()
            return data['data']['listSecurities']['items']
        else:
            print("Error:", response.text)

    except requests.exceptions.RequestException as e:
        print("Error:", str(e))
