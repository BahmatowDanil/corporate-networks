import React, { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

export const ColorPicker = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
		const [color, setColor] = useState('#ff7300');

		const handleOpen = useCallback(() => {
			setDisplayColorPicker(!displayColorPicker)
		}, [displayColorPicker, setDisplayColorPicker]);

		const handleClose = useCallback(() => {
			setDisplayColorPicker(false);
		}, [setDisplayColorPicker]);

		const idx = props.index;
		const handleChangeColor = props.handleChangeColor;
		const handleChange = useCallback((color) => {
			setColor(color.hex);
			handleChangeColor(color.hex, idx);
		}, [setColor, handleChangeColor, idx]);

		const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
				<div>
					<div style={ styles.swatch } onClick={handleOpen}>
						<div style={ styles.color } />
					</div>
					{displayColorPicker && 
						<div style={ styles.popover }>
							<div style={ styles.cover } onClick={handleClose}/>
							<ChromePicker color={color} onChange={handleChange} />
						</div>
					}
				</div>
    );
};