import app from "./app.js";

function main(){
    app.listen(app.get("port"));

    console.log(`App runing on port ${app.get("port")}`)
}

main();