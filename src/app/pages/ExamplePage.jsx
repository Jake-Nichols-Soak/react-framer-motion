import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import { useState } from 'react';

import { Delay } from '@/app/components/Delay';

// Staggered List
const motionProps = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
  whileHover: { x: 10 },
  transition: {
    type: 'spring',
    duration: 1,
  }
};

const ExamplePage = () => {
  // const shouldReduceMotion = useReducedMotion();
  const shouldReduceMotion = true;

  const defaultItems = [...Array(5)];

  const [items] = useState(defaultItems);

  const transformButton = shouldReduceMotion ? 'backgroundColor: "#333",' : 'transform: rotate(180deg)';

  return (
      <main>

        <section>
          {/*Title*/}
          Title
          <motion.h1
            animate={{ x: [50, 150, 0], opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
            }}
            initial={{ opacity: 0, scale: 0 }}
          >
            Framer Motion Examples
          </motion.h1>
        </section>

        <section>
          {/*Staggered List*/}
          List
          <ul>
            <AnimatePresence>
              {items.map((_, index) => (
                <Item key={index} index={index}>
                  Item {index}
                </Item>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <section>
          {/*Buttons*/}
          Buttons
          <div style={{ display: 'flex', gap: '8px' }}>
            <motion.button
              whileHover={{
                boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.2)',
                border: '2px solid black'
              }}
            >hover</motion.button>

            <motion.button
              whileTap={{
                transformButton
              }}
            >tap/click</motion.button>
          </div>

        </section>
      </main>
    );
};

// eslint-disable-next-line react/prop-types
const Item = ({ index, children }) => (
  <Delay delay={index * 300}>
    <motion.li key={index} {...motionProps}>
      {children}
    </motion.li>
  </Delay>
);

export default ExamplePage;
