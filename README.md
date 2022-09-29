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

**Notes**
*  method {u2net,u2net_human_seg,u2netp} \
      The method name, u2net, u2netp, u2net_human_seg
*  alpha_matting \
      When true use alpha matting cutout.\
*  alpha_matting_foreground 
      The trimap foreground threshold.\
*  alpha_matting_background   
      The trimap background threshold.\
*  alpha_matting_erode_size
      Size of element used for the erosion.\
* alpha_matting_base_size\
      The image base size.
      
**API end points**
* Route: /api/remove-background
* Method: POST
* Params:
   * image : (jpeg,png,jpg) 
   * method : (u2net,u2net_human_seg,u2netp)
   * alpha_matting : int
   * alpha_matting_foreground : int
   * alpha_matting_background : int
   * alpha_matting_erode_size : int
   * alpha_matting_base_size : int
* Response: {'result' : base64image }
   
