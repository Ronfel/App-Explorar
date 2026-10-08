import { Injectable } from '@angular/core';
import { from, defer, map, Observable } from 'rxjs';
import { get, push, ref, set } from 'firebase/database';
import { Lugar } from './lugar';
import { getRealtimeDatabase, snapshotToArray } from '../auth/firebase-database';

@Injectable({
    providedIn: 'root'
})
export class LugarService {
    salvar(lugar: Lugar): Observable<Lugar> {
        return defer(() => {
            const lugarRef = push(ref(getRealtimeDatabase(), 'lugares'));
            const id = lugarRef.key;
            if (!id) {
                throw new Error('Não foi possível gerar um identificador para o lugar.');
            }

            const dadosLugar = { ...lugar };
            delete dadosLugar.id;

            return from(set(lugarRef, dadosLugar)).pipe(
                map(() => ({ ...dadosLugar, id }))
            );
        });
    }

    obterTodos(): Observable<Lugar[]> {
        return defer(() =>
            from(get(ref(getRealtimeDatabase(), 'lugares'))).pipe(
                map(snapshot => snapshotToArray<Lugar>(snapshot))
            )
        );
    }

    obterPorId(id: string): Observable<Lugar | null> {
        return defer(() =>
            from(get(ref(getRealtimeDatabase(), `lugares/${id}`))).pipe(
                map(snapshot => {
                    if (!snapshot.exists()) {
                        return null;
                    }

                    return { ...snapshot.val(), id: snapshot.key ?? id } as Lugar;
                })
            )
        );
    }
}
