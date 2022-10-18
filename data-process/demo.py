import suanpan
from suanpan.app import app
from suanpan.app.arguments import Csv, Int
from suanpan import g


@app.input(Int(key="inputData1"))
@app.input(Csv(key="inputData2"))
@app.output(Csv(key="outputData1"))
def demo(context):
    args = context.args

    if args.inputData1:
        g.num = args.inputData1
    else:
        df = args.inputData2
        if g.num:
            return df[df["数量"]>=g.num]
        else:
            return df

if __name__ == "__main__":
    suanpan.run(app)
