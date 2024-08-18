import { ArticleBlockType } from "@/entities/Article/model/consts/articleConsts";
import { ArticleBlock } from "../../../model/types/article"
import { ArticleCodeBlockComponent } from "../../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import * as cl from './ArticleDetails.module.scss';

export const renderArticleBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          key={block.id}
          className={cl.block}
          block={block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={block.id}
          className={cl.block}
          block={block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={block.id}
          className={cl.block}
          block={block}
        />
      );
    default:
      return null;
  }
}