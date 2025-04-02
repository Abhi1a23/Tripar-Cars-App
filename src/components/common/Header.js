import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

const Header = ({
  title,
  leftIcon = 'arrow-back',
  rightIcon,
  onLeftPress,
  onRightPress,
  backgroundColor = colors.background,
  titleColor = colors.text,
  iconColor = colors.text,
  showShadow = true,
  titleAlign = 'center',
}) => {
  const insets = useSafeAreaInsets();
  
  const getContainerStyles = () => {
    const containerStyles = [
      styles.container,
      { 
        backgroundColor,
        paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
      }
    ];
    
    if (showShadow) {
      containerStyles.push(styles.shadow);
    }
    
    return containerStyles;
  };
  
  const getTitleStyles = () => {
    const titleStyles = [
      styles.title,
      { color: titleColor },
    ];
    
    switch (titleAlign) {
      case 'left':
        titleStyles.push(styles.titleLeft);
        break;
      case 'center':
        titleStyles.push(styles.titleCenter);
        break;
      case 'right':
        titleStyles.push(styles.titleRight);
        break;
      default:
        titleStyles.push(styles.titleCenter);
    }
    
    return titleStyles;
  };
  
  return (
    <View style={getContainerStyles()}>
      <StatusBar
        barStyle={backgroundColor === colors.background ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundColor}
      />
      
      <View style={styles.headerContent}>
        <View style={styles.leftContainer}>
          {leftIcon && onLeftPress && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onLeftPress}
            >
              <MaterialIcons name={leftIcon} size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={getTitleStyles()} numberOfLines={1}>
          {title}
        </Text>
        
        <View style={styles.rightContainer}>
          {rightIcon && onRightPress && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onRightPress}
            >
              <MaterialIcons name={rightIcon} size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'ios' ? 44 + StatusBar.currentHeight : 56 + StatusBar.currentHeight,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingHorizontal: spacing.md,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  titleLeft: {
    textAlign: 'left',
    marginLeft: spacing.sm,
  },
  titleCenter: {
    textAlign: 'center',
  },
  titleRight: {
    textAlign: 'right',
    marginRight: spacing.sm,
  },
});

export default Header;