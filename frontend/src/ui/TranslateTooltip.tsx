import { motion, AnimatePresence } from 'framer-motion';

interface TranslateTooltipProps {
  showTranslateTooltip: boolean;
  position?: 'top' | 'left' | 'right' | 'bottom';
}

// Tooltip component
const TranslateTooltip: React.FC<TranslateTooltipProps> = ({
  showTranslateTooltip, 
  position = 'top'
}) => {
  // Define position styles based on the position prop
  const getPositionStyle = () => {
    switch(position) {
      case 'left':
        return {
          top: '20%',
          right: '100%',
          transform: 'translateY(-50%)',
          marginRight: '10px'
        };
      case 'right':
        return {
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
          marginLeft: '10px'
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px'
        };
      case 'top':
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px'
        };
    }
  };

  // Get arrow position based on the position prop
  const getArrowStyle = () => {
    switch(position) {
      case 'left':
        return {
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '6px solid rgba(0, 0, 0, 0.75)'
        };
      case 'right':
        return {
          left: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid rgba(0, 0, 0, 0.75)'
        };
      case 'bottom':
        return {
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid rgba(0, 0, 0, 0.75)'
        };
      case 'top':
      default:
        return {
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid rgba(0, 0, 0, 0.75)'
        };
    }
  };

  return (
    <AnimatePresence>
      {showTranslateTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none', // Prevents tooltip from blocking hover events
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            ...getPositionStyle()
          }}
        >
          Translate to English
          <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            ...getArrowStyle()
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranslateTooltip;  // Export the component as default