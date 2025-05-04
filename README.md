## basic-CRUD-app-on-k8s-project

# doc
https://www.freecodecamp.org/news/how-to-build-a-production-ready-devops-pipeline-with-free-tools/?fbclid=IwY2xjawJ_3aZleHRuA2FlbQIxMABicmlkETFkc0pramduUVo5R3c3RmdRAR7KWFlv9ji1alxMsMLkRsOLahg-eDlFiN4Q4yf5Oi_eLoNSy1WsRukyQt35Yg_aem_-pkxJWncEAisVVn69Q0hUQ

# start frontend only
docker run -p 8080:80 crud-frontend

# start stack
docker-compose up --build

# k8s
kubectl apply -f k8s/postgres/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/

docker build -t yourname/crud-backend:latest ./backend
docker push yourname/crud-backend:latest

docker build -t yourname/crud-frontend:latest ./frontend
docker push yourname/crud-frontend:latest