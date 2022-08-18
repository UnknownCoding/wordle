import wordBank from './wordle-bank.txt'


export const boardDefault = [
                            ['','','','',''],
                            ['','','','','']
                            ,['','','','',''],
                            ['','','','','']
                            ,['','','','',''],
                            ['','','','','']
                            ]

export const generateWordSet = async () =>{
    let wordSet;
    let todaysWord;
    await fetch(wordBank).then((res)=>res.text()).then((result)=> {
        const wordArr = result.split("\r\n");
        wordSet = new Set(wordArr)
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
    })
    return {wordSet,todaysWord}
}
