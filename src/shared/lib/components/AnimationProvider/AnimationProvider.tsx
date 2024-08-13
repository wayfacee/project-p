import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// чтоб корректно работала типиз., нужно вынести типы
// на размер бандла не повлияет, пошта типы в бандл не уходят
type GestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  // true - loaded
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// грузим ассинх., чтобы в бандл не тянулись
const getAnimationModules = () => {
  // чтобы подтянуть модуль, пакет, жсон, стили итд.
  // можем исп. вот такой ассинх импорт:
  // импорт со скобками, он робит с промисами

  // обыч импорт - тока вверху
  // а lazy хоть где угодно

  // обе либы зависят друг от друга
  // хотим чтоб функц. завершилась тока тогда когда две библы. подгруз вместе
  // мы не хотим послед. (await etc.), хотим паралельно
  return Promise.all([
    import('@use-gesture/react'),
    import('@react-spring/web'),
  ]);
};

// hook:
export const useAnimationLibs = () => {
  // кд раз проверку на тайплав - андефайнд неудобно
  // можем скаставать, что вернет в обяз. порядке
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

// AnimationProvider - обрачивает только те места
// в которых нам нужен доступ к Гестуре и Спринг библам.
// получаем доступ к библам:
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // чтобы от рендера к рендеру был доступ к знач., но при этом
  // не было лишних перерис.
  const GestureRef = useRef<GestureType>();
  const SpringRef = useRef<SpringType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAnimationModules().then(([Gesture, Spring]) => {
      GestureRef.current = Gesture;
      SpringRef.current = Spring;
      setIsLoaded(true);
    });
  }, []);

  // пошта передаем вниз, и там могуть быть перерис.
  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded],
  );
  // рефы. в массив завис - добавлять смысла нет

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
