const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./app/core/controller');

const templating = require('./app/core/templating');

const rest = require('./app/core/rest');

const dirStatic = __dirname + '/app/static';

const dirViews = __dirname+'/app/views';

const dirCtrls = __dirname+'/app/controllers';

const port = 3000;

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// static file support:
let staticFiles = require('./app/core/static-files');
app.use(staticFiles('/static/', dirStatic));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating(dirViews, {
    noCache: true,
    watch: true
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller(dirCtrls));

app.listen(port,()=>{
    console.log(`app started at port ${port}...`);
});


