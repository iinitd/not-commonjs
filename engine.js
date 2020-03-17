var fs = require('fs')


function Notmodule() {
    this.exports = {}
    this.id = ""
    this.filename = ""
    this.parent = null
}

Notmodule.prototype.load = function (filename, parent, b) {

    this.parent = parent
    this.id = filename
    this.filename = filename

    var dirname = "."
    var data = fs.readFileSync(filename + ".js")

    var funccontent = 'function inner(notexports, notrequire, notmodule, __filename, __dirname){' + data.toString() + '}'

    eval(funccontent)

    norequire = this.notrequire.bind(this)

    inner(this.exports, norequire, this, filename, dirname)

    return this.exports


}


Notmodule.prototype.notrequire = function (filename) {

    var child = new Notmodule()
    child.id = filename
    child.filename = filename
    child.load(filename, this, true)

    return child.exports

}

var notmodule = new Notmodule()

notmodule.load("index", null, true)