
##### before running the project make sure you have changed the backend/.env file to
- DATABASE_URL="postgresql://user:password@postgres:5432/ft_tran?schema=public"

### How to run the project 
`docker-compose up`

### check if user is persisting successfully in database (adminer service page)
- `localhost:8080`
####  information to input in adminer service page 
>  Systeme:     postgreSQL,
>  Serveur:     postgres
>  Utilisateur: user
>  mot de pass: password

### API :
### login
- `localhost:5000/api/auth/callback`
