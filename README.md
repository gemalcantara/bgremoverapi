# bgremoverapi

**Setup** 

* Go inside the project folder where dockerfile is located and run \
   `docker build -t {name of image} .` \
   `docker run -d --name {container name} -p {port}:3000 --restart unless-stopped {name of image}` \
   `docker exec -ti {container name} /bin/bash` 
* if using windows and the command above is not working try this \
  `winpty docker exec -ti {container name} /bin/bash` \
  `npm install` \
And your all set enjoy removing background  


**API end points**

* wip
