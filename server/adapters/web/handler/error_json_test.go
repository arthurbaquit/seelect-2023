package handler

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestHandlerErrorJson(t *testing.T) {
	t.Run("jsonError", func(t *testing.T) {
		t.Run("should return error message", func(t *testing.T) {
			msg := "error message"
			expected := []byte(`{"message":"error message"}`)
			actual := jsonError(msg)
			require.Equal(t, expected, actual)
		})
	})
}
