import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProba, getProbaIdentifier } from '../proba.model';

export type EntityResponseType = HttpResponse<IProba>;
export type EntityArrayResponseType = HttpResponse<IProba[]>;

@Injectable({ providedIn: 'root' })
export class ProbaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/probas', 'testmicro');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(proba: IProba): Observable<EntityResponseType> {
    return this.http.post<IProba>(this.resourceUrl, proba, { observe: 'response' });
  }

  update(proba: IProba): Observable<EntityResponseType> {
    return this.http.put<IProba>(`${this.resourceUrl}/${getProbaIdentifier(proba) as number}`, proba, { observe: 'response' });
  }

  partialUpdate(proba: IProba): Observable<EntityResponseType> {
    return this.http.patch<IProba>(`${this.resourceUrl}/${getProbaIdentifier(proba) as number}`, proba, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProba>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProba[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProbaToCollectionIfMissing(probaCollection: IProba[], ...probasToCheck: (IProba | null | undefined)[]): IProba[] {
    const probas: IProba[] = probasToCheck.filter(isPresent);
    if (probas.length > 0) {
      const probaCollectionIdentifiers = probaCollection.map(probaItem => getProbaIdentifier(probaItem)!);
      const probasToAdd = probas.filter(probaItem => {
        const probaIdentifier = getProbaIdentifier(probaItem);
        if (probaIdentifier == null || probaCollectionIdentifiers.includes(probaIdentifier)) {
          return false;
        }
        probaCollectionIdentifiers.push(probaIdentifier);
        return true;
      });
      return [...probasToAdd, ...probaCollection];
    }
    return probaCollection;
  }
}
