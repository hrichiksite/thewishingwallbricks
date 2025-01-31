This is the backend for the Wishing Wall display, it loads the data from the slack channel, makes a few transformations and then loads it into a MeiliSearch instance.


./meilisearch-importer \
    --url 'https://meilisearch.instance.local' \
    --api-key 'ADMIN_APIKEY' \
    --primary-key 'ts' \
    --index wishes \
    --files ./historical_data/combinedData.ndjson \


