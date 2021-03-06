
/*
Copyright (c) 2019 The Khronos Group Inc.
Use of this source code is governed by an MIT-style license that can be
found in the LICENSE.txt file.
*/


#ifdef GL_ES
precision mediump float;
#endif
varying vec4 color;

void main (void)
{
	const float M_PI = 3.14159265358979323846;
	float c = 4.0 * 2.0 * (color.r - 0.5);
	float atan_c = 0.0;
	float scale = 1.0;
	float sign = 1.0;
	vec4 result;

	if(c < 0.0)
	{
		sign = -1.0;
		c *= -1.0;
	}

	if(c <= 1.0)
	{
		// Taylors series expansion for atan
		for(int i = 1; i < 12; i += 2)
		{
			atan_c += scale * pow(c, float(i)) / float(i);
			scale *= -1.0;
		}

		result = vec4(sign * atan_c / M_PI + 0.5, 0.0, 0.0, 1.0);
	}
	else
	{
		c = 1.0 / c;

		// Taylors series expansion for atan
		for(int i = 1; i < 12; i += 2)
		{
			atan_c += scale * pow(c, float(i)) / float(i);
			scale *= -1.0;
		}

		result = vec4(sign * (M_PI / 2.0 - atan_c) / M_PI + 0.5, 0.0, 0.0, 1.0);
	}

	gl_FragColor = result;
}
