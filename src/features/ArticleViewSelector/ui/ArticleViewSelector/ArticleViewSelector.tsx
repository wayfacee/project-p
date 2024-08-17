import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleViewSelector.module.scss';
import { memo } from 'react';
import { ArticleView } from '@/entities/Article';
import ListIconDeprecated from '@/shared/assets/icons/listD.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

// можно было бы на ур. ентити, фичи, или стр. но лучш. в фичи
interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          border="round"
          className={classNames(cl.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
        >
          {/**
           * добавили лишнюю дом ноду, хотя по идеи карточка могла тоже справится
           * то есть из карточки можно такой же флекс контейнер сделать и гэп задать
           * но у нас задача все решает средставами дизайн системы, средствами опрд. инструментов
           * комп. функц. хелперов итд., чтобы у разраба не было необход
           * открывать цсс и рыться там, пошта он может задать не те отступы,
           * которые заданы дизайн системой, там его ниче неогр., а тут мб тс, еслинт итд.
           * вероятность ниже, и поэтому можем сделать такой хелпер
           * (миксин getHstack({gap: '16', justify: 'center'}))
           * и это будет обыч. функц. которая возвращает класс, в соотв. с опйиями которые передали
           * возвращает набор классов, по дизайн системе, отформат., раставит отступы итд.
           * это чтоб не создавать лишнюю дом ноду!!!!!
           */}
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                clickable
                onClick={onClick(viewType.view)}
                Svg={viewType.icon}
                className={classNames(cl.icons, {
                  [cl.notSelected]: viewType.view === view,
                })}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cl.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                height={25}
                width={25}
                Svg={viewType.icon}
                className={classNames(cl.icons, {
                  [cl.selected]: viewType.view === view,
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
