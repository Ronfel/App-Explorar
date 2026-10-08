import { Injectable } from '@angular/core';
import { from, defer, map, Observable } from 'rxjs';
import { get, push, ref, set } from 'firebase/database';
import { Categoria } from './categoria';
import { getRealtimeDatabase, snapshotToArray } from '../auth/firebase-database';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    salvar(categoria: Categoria): Observable<Categoria> {
        return defer(() => {
            const categoriaRef = push(ref(getRealtimeDatabase(), 'categorias'));
            const id = categoriaRef.key;
            if (!id) {
                throw new Error('Não foi possível gerar um identificador para a categoria.');
            }

            const dadosCategoria = { ...categoria };
            delete dadosCategoria.id;

            return from(set(categoriaRef, dadosCategoria)).pipe(
                map(() => ({ ...dadosCategoria, id }))
            );
        });
    }

    obterTodas(): Observable<Categoria[]> {
        return defer(() =>
            from(get(ref(getRealtimeDatabase(), 'categorias'))).pipe(
                map(snapshot => snapshotToArray<Categoria>(snapshot))
            )
        );
    }
}
