
import { NextResponse } from "next/server";
const database =[
    {id: 1, name: 'Bruxo', gols: 100,  assistencias: 300, posicao: 'Atacante'},
    {id: 2, name: 'Bruno', gols: 102,  assistencias: 30, posicao: 'zagero'},
    {id: 3, name: 'zico', gols: 100,  assistencias: 300, posicao: 'Atacante'},
    {id: 4, name: 'beligol', gols: 1300,  assistencias: 500, posicao: 'Atacante'},
]

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get('nome');

    if (!nome) {
        return NextResponse.json({error: 'nome do jogador obrigatorio.'},{status:400});
    }

    const nomeBusca = nome.toLowerCase().trim();

    const jogador = database.find(jogador => jogador.name.toLowerCase() === nomeBusca);

    if (!jogador) {
        return NextResponse.json({error: 'jogador não encontrado.'}, {status: 404});

    }
    return NextResponse.json(jogador);
}
