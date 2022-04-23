const { execSync } = require("child_process");

exports.diagnose = function(filename) {
	cmdline = "inference.py --imPath " + filename;
	var diag;
	diag = execSync(cmdline).toString();
	return JSON.parse(diag);
}