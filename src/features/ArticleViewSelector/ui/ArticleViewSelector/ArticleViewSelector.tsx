import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleViewSelector.module.scss';
import { memo } from 'react';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tiled.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';

// можно было бы на ур. ентити, фичи, или стр. но лучш. в фичи
interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  // onClick => принимает ивент, которыц специфич. для слуш. событ онКлик
  // но нам нужно сюда принимать новый вид отоб. который
  // юзер выбрал, поэтому мы делаем функц. которая возв.
  // функц. (замыкание), и уже на вверх. ур. принимаем само вью

  // в онКлик не передаем как ссылку, а вызываем,
  // и вызов этой функц. вернет новую функц.
  const onClick = (newView: ArticleView) => () => {
    // return () => {
    onViewClick?.(newView);
    // }
  };

  // у нас есть. внеш. функц. который приним. новый вид. отоб.
  // и есть внут. функц., которая поподает как слуш. событ.
  // в онКлик

  // возвращает новую функцию, которая будет вызвана
  // при клике на кнопку. Это позволяет передать
  // определённый вид (view) в качестве аргумента для onViewClick,
  //  когда пользователь кликает на одну из кнопок

  return (
    <div className={classNames(cl.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ButtonTheme.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames(cl.icons, {
              [cl.selected]: viewType.view === view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});
