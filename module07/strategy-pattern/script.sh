docker run \
    --name postgres \
    -e POSTGRES_USER=cesaraugusto \
    -e POSTGRES_PASSWORD="senha0001" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres


docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=cesaraugusto \
    -e MONGO_INITDB_ROOT_PASSWORD=senha0001 \
    -p 27017:27017 \
    -d \
    mongo