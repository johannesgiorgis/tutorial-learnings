/* Exercise: Errors
https://tour.golang.org/methods/20
*/

package main

import (
	"fmt"
	"math"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("Sqrt: negative number %g", e)
}

const delta = 1e-10

// Sqrt : My square root function
func Sqrt(f float64) (float64, error) {
	if f < 0 {
		return 0, ErrNegativeSqrt(f)
	}
	z := f / 2
	for {
		n := z - (z*z-f)/(2*z)
		if math.Abs(n-z) < delta {
			break
		}
		z = n
	}
	//return z
	return z, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
