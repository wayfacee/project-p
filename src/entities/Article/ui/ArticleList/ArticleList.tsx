/* eslint-disable react/jsx-indent */
import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ArticleList.module.scss';
import { HTMLAttributeAnchorTarget, LegacyRef, memo } from "react";
import { Article } from "../../model/types/article";
import { ArticleView } from "entities/Article/model/consts/consts";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  // вирт. сделали условной 
  virtualized?: boolean;
}

// ЛУЧШЕ ИСП. ДРУГУЮ ЛИБУ + ПРАКТИКА 

// разгрузили комп.
const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cl.card} key={index} view={view} />
  ));

// не будем завязываться на какой то стейт не будем,
// статьи будем приним. из вне, тип не тока на стр. со списком
// но и как рек. будет когда читаешь одну статью

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
    virtualized = true,
  } = props;
  const { t } = useTranslation();

  // так же плитки поплывут, но мы не хотим оч кординально менять
  // и две решения делать
  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 3;
  // ref.currentWidth (ШИРИНА СТР/БЛОКА) / ITEM_WIDTH (ШИРИНА ПЛИТКИ) [динам. выщитываем сколько элем в линии / 1 строке]
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow; // от какого индекса до какаого индекса рендерим элем.
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length); // мб выйдем за пределы массива 

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleListItem
          article={articles[i]} // раньше интер. по массиву, а сейчас по индексу достаем
          target={target}
          className={cl.card}
          view={view}
          key={articles[i].id}
        />
      )
    }

    return (
      <div
        key={key}
        style={style}
        className={cl.row}
      >
        {items}
      </div>
    );
  }
  // целиком замен. на скелетоны, поэтому надо под конец
  // добавить - исЛоадинг
  // иначе будут скачки
  // так же ошибка в setAll => addMany

  // если статьей нет:
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдена')} />
      </div>
    )
  }

  return (
    <WindowScroller // у спсика свой скролл, а у нас общий скролл
      scrollElement={document.getElementById(PAGE_ID) as Element} // с таким ид есть элем. поэтому кастуем
    >
      {/* функция которая возвращает */}

      {({ width,
        height,
        registerChild, // чтобы скроллилось не изнутри
        onChildScroll,
        isScrolling,
        scrollTop }) => (
        <div
          ref={registerChild as LegacyRef<HTMLDivElement>} // чтобы скролл знал про список
          className={classNames(cl.ArticleList, {}, [className, cl[view]])}
        >
          {virtualized
            ? (
              <List
                height={height ?? 700}
                rowCount={rowCount} // колл элементов
                rowHeight={isBig ? 700 : 330} // если динамическая высота, то в доке есть
                rowRenderer={rowRenderer} // функц. которая будет рендер. комп.
                width={width ? width - 80 : 700} // нужно учит. паддинги в пейдж итд., но хардкодить тоже низя
                autoHeight // просто булеан флаг
                onScroll={onChildScroll}
                isScrolling={isScrolling} // момент когда скроллим
                scrollTop={scrollTop}
              />
            ) : (
              articles.map(item => (
                <ArticleListItem
                  article={item}
                  view={view}
                  target={target}
                  key={item.id}
                  className={cl.card}
                />
              ))
            )}
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});