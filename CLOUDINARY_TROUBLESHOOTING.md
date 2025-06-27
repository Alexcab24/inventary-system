# Cloudinary Troubleshooting Guide

## Problema: Error al subir imágenes en producción

### Síntomas
- Las imágenes se suben correctamente en desarrollo
- En producción, al intentar crear un producto con imagen, se produce un error
- El error no proporciona información específica sobre qué está fallando

### Causas Comunes

#### 1. Variables de Entorno No Configuradas
**Problema**: Las variables de entorno de Cloudinary no están configuradas en producción.

**Solución**: Configura una de estas opciones:

**Opción A - URL Completa (Recomendado):**
```env
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

**Opción B - Variables Separadas:**
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

#### 2. Credenciales Incorrectas
**Problema**: Las credenciales de Cloudinary son incorrectas o han expirado.

**Solución**: 
1. Ve a tu [Dashboard de Cloudinary](https://cloudinary.com/console)
2. Verifica que las credenciales sean correctas
3. Regenera las credenciales si es necesario

#### 3. Límites de Cuenta
**Problema**: Has alcanzado los límites de tu cuenta gratuita de Cloudinary.

**Solución**:
- Verifica el uso en tu dashboard de Cloudinary
- Considera actualizar a un plan de pago si es necesario

### Herramientas de Debugging

#### 1. Componente de Debug
Puedes usar temporalmente el componente `CloudinaryDebug` para verificar el estado:

```tsx
import { CloudinaryDebug } from "@/components/ui/CloudinaryDebug";

// En cualquier página temporalmente
<CloudinaryDebug />
```

#### 2. Verificación Manual
Puedes verificar manualmente las variables de entorno:

```bash
# En tu servidor de producción
echo $CLOUDINARY_URL
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
echo $CLOUDINARY_API_SECRET
```

### Pasos para Resolver

1. **Verifica las Variables de Entorno**
   - Asegúrate de que las variables estén configuradas en tu servidor de producción
   - Verifica que no haya espacios extra o caracteres especiales

2. **Prueba la Configuración**
   - Usa el componente de debug para verificar el estado
   - Revisa los logs del servidor para errores específicos

3. **Verifica las Credenciales**
   - Confirma que las credenciales sean válidas en el dashboard de Cloudinary
   - Prueba las credenciales en un entorno de desarrollo

4. **Revisa los Límites**
   - Verifica que no hayas alcanzado los límites de tu cuenta
   - Considera optimizar las imágenes si es necesario

### Configuración Recomendada

Para producción, se recomienda usar la URL completa:

```env
CLOUDINARY_URL="cloudinary://123456789012345:abcdefghijklmnop@your-cloud-name"
```

### Logs Útiles

Los logs mejorados ahora incluyen:
- Estado de configuración de Cloudinary
- Errores específicos de validación de imágenes
- Información sobre el tamaño y tipo de archivo
- URLs de imágenes subidas exitosamente

### Contacto

Si el problema persiste después de seguir estos pasos:
1. Revisa los logs del servidor
2. Verifica la configuración de red del servidor
3. Contacta al soporte de Cloudinary si es necesario 