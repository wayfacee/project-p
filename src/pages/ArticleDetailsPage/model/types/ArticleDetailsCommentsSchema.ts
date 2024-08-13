// где хранить список комментов?
// на уровне коммент ентети, на уровне стр., отдельная фича
// если в артикл мы хранили в на уровне с ентети
// поэтому либо на уровне стр, либо отдел. фича (articleCommentList)
// и внутри изолировать стейт, запрос на сервер, переисп. сущ. энтети
// но мы делаем тоже самое на ур. стр

import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// type EntetyId = number | string;

// interface DictionaryNum<T> {
//   [id: number]: T | undefined;
// }

// interface Dictionary<T> extends DictionaryNum<T> {
//   [id: string]: T | undefined;
// }

// interface EntityState<T> {
//   ids: EntetyId[];
//   entities: Dictionary<T>;
// }

export interface ArticleDetailsCommentsSchema
  extends EntityState<Comment, string> {
  isLoading: boolean;
  error?: string;
}
