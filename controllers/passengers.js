import { PassengerModel } from '../Models/Passengers.js'

export default async function PassengerController(req, res) {
    const Sex = req.body.Sex;
    const Age = req.body.Age;
    const Pclass = req.body.Pclass;

    let arrayAge = [[0,18], [19,30], [31,50], [51,124]]
    let arraySex = ["male", "female"]

    let graphique = {
        "Age" : ["0-18 ans", "19-30 ans", "31-50 ans", "+ de 50 ans"],
        "Sexe" : ["male", "female"],
        "Classe" : [1,2,3],
        "Pourcentages": [[], [], []]
    }

    if (Age && Pclass) {
        for(let i = 1; i <= 3; i++) {
            console.log("Classe" + i)
            for (const elementsAge of arrayAge ) {
                console.log("Age minimum " + elementsAge[0] + " Age maximum " + elementsAge[1])

                let requete = {
                    "Age" : {$gt: elementsAge[0], $lt : elementsAge[1]},
                    "Pclass" : i
                }

                let resultat1 = await PassengerModel.count(requete)
        
                let requete1 = {
                    "Age" : {$gt: elementsAge[0], $lt : elementsAge[1]},
                }
    
                let resultat2 = await PassengerModel.count(requete1)
                let result = (resultat1 / resultat2) * 100
                graphique.Pourcentages[i-1].push(result)
            }
        }
        console.log(graphique.Pourcentages)
    }

    if (Sex && Pclass) {
        for(let i = 1; i <= 3; i++) {
            console.log("Classe" + i)
            for (const elementsSex of arraySex ) {
                console.log("Sex " + elementsSex)
                let requete = {
                    "Sex" : elementsSex,
                    "Pclass" : i
                }

                let resultat1 = await PassengerModel.count(requete)
        
                let requete1 = {
                    "Pclass" : i,
                }
    
                let resultat2 = await PassengerModel.count(requete1)
                let result = (resultat1 / resultat2) * 100

                console.log(result)
            }
        }
    }

    if (Age && Sex) {
        for (const elementsAge of arrayAge ) {
            console.log("Age minimum" + elementsAge[0] + " Age maximum" + elementsAge[1])
            for (const elementsSex of arraySex ) {
                let requete = {
                "Age" : {$gt: elementsAge[0], $lt : elementsAge[1]},
                "Sex" : elementsSex,
            }

            let resultat1 = await PassengerModel.count(requete)
        
            let requete1 = {
                "Age" : {$gt: elementsAge[0], $lt : elementsAge[1]},
            }
    
            let resultat2 = await PassengerModel.count(requete1)
            let result = (resultat1 / resultat2) * 100
            console.log(result)
            }
        }
    }
    res.render('result', { graphique });
}