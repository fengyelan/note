const child_process = require("child_process");
const tip = process.argv[2] || 'update';
const execCMD = function(cmd){
  child_process.exec(cmd, function(error, stdout, stderr) {
    if(error) {
        console.error('error: ' + error);
        return;
    }
  })
}
const cmd = 'git add -A && git status && git commit -m "'+tip+'" && git push origin master';
execCMD(cmd);

