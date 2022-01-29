sudo docker system prune --volumes -y
sudo docker container prune -y
sudo docker image prune -y
sudo docker volume prune -y
sudo docker network prune -y
#sudo docker container rm $(sudo docker container ls -aq)
#sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -a -q) --force
