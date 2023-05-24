#How to run the project 
    docker-compose up cd backend && yarn start:dev 

#How to run e2e test 
    docker-compose up test-db cd backend && yarn test:e2e 
// to check if test are persisting successfully run 
    "yarn dotenv -e .env.test prisma studio"