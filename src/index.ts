import app from '@server';


const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.info('Express server started on port: ' + port);
});
