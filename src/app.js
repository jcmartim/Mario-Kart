// Jogadores
const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

//Função para rolar dados.
async function getRandomBlock() {
    let random = Math.random();
    let result = '';

    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break;
        case random < 0.66:
            result = 'CURVA';
            break;
        default:
            result = 'COMFRONTO';
    }

    return result;
}

//Função para retonar os logs
async function logRollResult(playName, block, diceResult, attribute) {
    console.log(
        `${playName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
    );
}

async function playRaceEngine(play1, play2) {

    for (let round = 1; round <= 5; round++) {
        console.log(`🎏 Rodada ${round}`);

        //sortear blocos
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        //Blocos
        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + play1.velocidade;
            totalTestSkill2 = diceResult2 + play2.velocidade;
            await logRollResult(play1.nome, 'velocidade', diceResult1, play1.velocidade);
            await logRollResult(play2.nome, 'velocidade', diceResult2, play2.velocidade);
        }
        if (block === 'CURVA') {
            totalTestSkill1 = diceResult1 + play1.manobrabilidade;
            totalTestSkill2 = diceResult2 + play2.manobrabilidade;
            await logRollResult(play1.nome, 'manobrabilidade', diceResult1, play1.manobrabilidade);
            await logRollResult(play2.nome, 'manobrabilidade', diceResult2, play2.manobrabilidade);
        }
        if (block === 'COMFRONTO') {
            let powerResult1 = diceResult1 + play1.poder;
            let powerResult2 = diceResult2 + play2.poder;
            console.log(`${play1.nome} confrontou com ${play2.nome}`);
            await logRollResult(play1.nome, 'poder', diceResult1, play1.poder);
            await logRollResult(play2.nome, 'poder', diceResult2, play2.poder);

            if (powerResult1 > powerResult2 && play2.pontos > 0) {
                console.log(`${play1.nome} venceu o confronto! ${play2.nome} perdeu um ponto.`);
                play2.pontos--;
                console.log('Porra 1');
            }
            if (powerResult2 > powerResult1 && play1.pontos > 0) {
                console.log(`${play2.nome} venceu o confronto! ${play1.nome} perdeu um ponto.`);
                play1.pontos--;
                console.log('Porra 2');
            }
            if (powerResult1 === powerResult2 || powerResult2 === powerResult1) {
                console.log('Confronto empatado! Nunhum dos jogadores perdeu ponto.')
            }

        }

        //Verifica o vencedor.
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${play1.nome} marcou um ponto!`);
            play1.pontos++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${play2.nome} marcou um ponto!`);
            play2.pontos++;
        }

        console.log('|---------------------------------------------------|');

    }
}

async function declareWinner(play1, play2) {
    console.log('Resultado final: ');
    console.log(`${play1.nome}: ${play1.pontos} ponto(s)`);
    console.log(`${play2.nome}: ${play2.pontos} ponto(s)`);

    if (play1.pontos > play2.pontos) {
        console.log(`VENCEDOR: ${play1.nome}`);
    } else if (play1.pontos < play2.pontos) {
        console.log(`VENCEDOR: ${play2.nome}`);
    } else {
        console.log(`EMPATE!!!}`);
    }
}

(async function main() {
    console.log(`🚦 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
