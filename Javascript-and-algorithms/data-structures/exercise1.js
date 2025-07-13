class UniqueArray {

    constructor (){
        this.uniqueStuff = [];
        this.uniquelength = 0;
        this.uniqueStuffObj = {};
    }

    add(item){

        if(!(item in this.uniqueStuffObj)){

            this.uniqueStuff[this.uniquelength] = item;
            this.uniqueStuffObj[item] = this.uniquelength++;
        }

    }

     showAll(){
        console.log(this.uniqueStuff);
     }

     exists(item) {
        return item in this.uniqueStuffObj;
     }

     get(index){
        return  (index >= 0 && index < this.uniquelength) ? this.uniqueStuff[index] : -1;
     }
}


const uniqueStuff = new UniqueArray()
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
console.log(uniqueStuff.exists("toy")) //returns true
uniqueStuff.add("poster")
uniqueStuff.add("hydrogen")
console.log(uniqueStuff.get(2)) //prints "hydrogen"
