const arr = [
    {
        name: "anas",
        fatherName: "Abdul"
    },
    {
        name: "anas",
        fatherName: "Abdul"
    },
    {
        name: "azeem",
        fatherName: "Abdul"
    },
    {
        name: "test",
        fatherName: "Abdul"
    }
    
]

const enter = "test"

const result = arr.filter((x) => x.name == enter)



const run = (result)=>{
   
    for (let i = 0; i < result.length; i++) {
        return `${result[i].name}`;
    }
    // return result[0].name;
}

console.log(run(result));
