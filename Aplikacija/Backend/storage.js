const multer=require('multer');
const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
  };  
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error=new Error("Invalide mime type");
        if(isValid){
            error=null;
        }
        cb(error,"images");
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLocaleLowerCase().split(' ').join('_');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,Date.now()+name);
    }
});
module.exports.storage=multer({storage:storage});