import requests
import json
from Config import api_key, endpoint_url

def access_appsync_get_securities():
    try:
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

def access_appsync_update_security(security):
    try:
        # Define the GraphQL mutation to update a security
        mutation = '''
            mutation UpdateSecurity($input: UpdateSecurityInput!) {
              updateSecurity(input: $input) {
                id
                symbol
                portfolioId
                portfolioAllocation
                profitAllocation
                currentPrice
                createdAt
                updatedAt
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
            'query': mutation,
            'variables': {
                'input': {'id': security['id'], 'currentPrice': security['currentPrice']}
            }
        }

        # Make the HTTP POST request
        response = requests.post(endpoint_url, headers=headers, data=json.dumps(payload))

        # Handle the response
        if response.status_code == 200:
            data = response.json()
            print("Security updated successfully:")
            print(data)
        else:
            print("Error:", response.text)

    except requests.exceptions.RequestException as e:
        print("Error:", str(e))
