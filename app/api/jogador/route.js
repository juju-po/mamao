
import { NextResponse } from "next/server";
const database =[
    {id: 1, name: 'Bruxo', gols: 100,  assistencias: 300, posicao: 'Atacante'},
    {id: 2, name: 'Bruno', gols: 102,  assistencias: 30, posicao: 'Zagueiro'},
    {id: 3, name: 'zico', gols: 100,  assistencias: 300, posicao: 'Atacante'},
    {id: 4, name: 'beligol', gols: 1300,  assistencias: 500, posicao: 'Atacante'},
    {id: 5, name: 'Ronaldo', gols: 250,  assistencias: 120, posicao: 'Atacante'},
    {id: 6, name: 'Ronaldinho', gols: 195,  assistencias: 250, posicao: 'Meia'},
    {id: 7, name: 'Pelé', gols: 1283,  assistencias: 400, posicao: 'Atacante'},
    {id: 8, name: 'Neymar', gols: 125,  assistencias: 80, posicao: 'Atacante'},
    {id: 9, name: 'Vinicius Jr', gols: 35,  assistencias: 25, posicao: 'Atacante'},
    {id: 10, name: 'Thiago Silva', gols: 10,  assistencias: 5, posicao: 'Zagueiro'},
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
