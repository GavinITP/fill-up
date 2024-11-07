docker buildx build --push -t punnyoz/fillup-gateway backend\gateway
docker buildx build --push -t punnyoz/fillup-mail-service backend\services\mail-service
docker buildx build --push -t punnyoz/fillup-report-service backend\services\report-service
docker buildx build --push -t punnyoz/fillup-user-service backend\services\user-service

docker buildx build --push -t punnyoz/fillup-water-station-service backend\services\water-station-service
docker buildx build --push -t punnyoz/fillup-web frontend

<!-- docker buildx build --push -t punnyoz/fillup-water-station-service -f backend/services/waterstation.Dockerfile backend\services -->

helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace