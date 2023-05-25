
### How to run the project 
`docker-compose up`

### How to run e2e test 
`docker-compose up test-db && cd backend && yarn test:e2e`

### check if test are persisting successfully run 
`yarn dotenv -e .env.test prisma studio`


### API :
### signup
- `localhost:3000/api/auth/signup`


### signin
- `localhost:3000/api/auth/signup`
